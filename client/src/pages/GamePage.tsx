/** @format */

import LoadingMessage from "../components/LoadingMessage"
import ErrorMessage from "../components/ErrorMessage"
import ProgressBar from "../components/ProgressBar"
import GameStatus from "../components/game/GameStatus"
import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getMysteryById, requestHint, submitAnswer } from "../api"
import type { Mystery } from "../types"
import StageHeader from "../components/game/StageHeader"
import StageProgress from "../components/game/StageProgress"
import StageQuestion from "../components/game/StageQuestion"
import AnswerOptions from "../components/game/AnswerOptions"
import SubmitAnswerButton from "../components/game/SubmitAnswerButton"
import HintButton from "../components/game/HintButton"
import HintBox from "../components/game/HintBox"
import SuccessMessage from "../components/game/SuccessMessage"
import WrongAnswerMessage from "../components/game/WrongAnswerMessage"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { initStageHints, setHintData } from "../store/hintSlice"

function GameSession({ id }: { id: string }) {
  const navigate = useNavigate()
  const [mystery, setMystery] = useState<Mystery | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const dispatch = useDispatch()
  const { currentHint: hint, hintsRemaining } = useSelector(
    (state: RootState) => state.hint,
  )
  const [message, setMessage] = useState("")

  const [feedbackTone, setFeedbackTone] = useState<"success" | "wrong">(
    "success",
  )
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [pending, setPending] = useState<"answer" | "hint" | null>(null)
  const [reload, setReload] = useState(0)
  const active = useRef(false)
  const busy = useRef(false)

  useEffect(() => {
    active.current = true
    return () => {
      active.current = false
    }
  }, [])

  useEffect(() => {
    let ignore = false
    setIsLoading(true)
    setError("")
    setSelectedAnswer("")
    async function load() {
      try {
        const data = await getMysteryById(id)
        if (ignore) return

        if (data.locked) {
          navigate("/mysteries", { replace: true })
          return
        }

        if (data.solved) {
          navigate(`/result/${data.id}`, { replace: true })
          return
        }
       setMystery(data)
        dispatch(initStageHints(data.hintsRemaining))
        if (data.currentHint) {
          dispatch(
            setHintData({
              hint: data.currentHint,
              hintsRemaining: data.hintsRemaining,
              alreadyShown: true,
            }),
          )
        } } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error ? error.message : "Could not load the game.",
          )
        }
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    void load()
    return () => {
      ignore = true
    }
  }, [id, reload, navigate, dispatch])
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (
      !selectedAnswer.trim() ||
      busy.current ||
      isLoading ||
      error ||
      !mystery
    )
      return
    busy.current = true
    setPending("answer")
    setMessage("")

    try {
      const response = await submitAnswer(id, selectedAnswer.trim())
      if (!active.current) return
      setMessage(response.message)
      setFeedbackTone(response.correct ? "success" : "wrong")
      if (response.correct) {
        // Fetch server state again; the answer response is not a complete mystery.
        setIsLoading(true)
        setReload((value) => value + 1)
      }
    } catch (error) {
      if (active.current) {
        setError(
          error instanceof Error ?
            error.message
          : "Could not submit the answer.",
        )
      }
    } finally {
      busy.current = false
      if (active.current) setPending(null)
    }
  }
  async function handleHint() {
    if (busy.current || isLoading || error || !mystery) return
    if (hintsRemaining === 0) return

    busy.current = true
    setPending("hint")
    setMessage("")

    try {
      const response = await requestHint(id)
      if (!active.current) return
      dispatch(
        setHintData({
          hint: response.hint,
          hintsRemaining: response.hintsRemaining,
          alreadyShown: false,
        }),
      )
    } catch (error) {
      if (active.current) {
        setError(
          error instanceof Error ? error.message : "Could not request a hint.",
        )
      }
    } finally {
      busy.current = false
      if (active.current) setPending(null)
    }
  }

  function reloadGame() {
    setMessage("")
    setReload((value) => value + 1)
  }

  return (
    <main className="game-page">
      <Link className="back-link" to={`/mysteries/${encodeURIComponent(id)}`}>
        ← Back to mystery details
      </Link>
      {isLoading && <LoadingMessage label="Loading game..." />}
      <GameStatus status={pending === "answer" ? "submitting" : "idle"} />
      {message &&
        (feedbackTone === "success" ?
          <SuccessMessage message={message} />
        : <WrongAnswerMessage message={message} />)}
      {!isLoading && error && (
        <ErrorMessage
          title="Unable to continue"
          message={error}
          onRetry={reloadGame}
          retryLabel="Reload game"
        >
          <p>Reload the current progress before trying another action.</p>
          <Link to="/mysteries">Back to mysteries</Link>
        </ErrorMessage>
      )}
      {!isLoading && !error && mystery && (
        <>
          <StageHeader title={mystery.title} caseId={mystery.id} />
          <StageProgress
            currentStage={mystery.currentStage}
            totalStages={mystery.totalStages}
          />
          <ProgressBar
            current={mystery.currentStage}
            total={mystery.totalStages}
          />
          <form className="answer-form" onSubmit={handleSubmit}>
            <fieldset disabled={pending !== null}>
              <StageQuestion question={mystery.currentQuestion} />
              {mystery.currentOptions.length > 0 ?
                <AnswerOptions
                  options={mystery.currentOptions}
                  selected={selectedAnswer}
                  onSelect={setSelectedAnswer}
                  disabled={pending !== null}
                />
              : <label className="text-answer">
                  Your answer
                  <input
                    value={selectedAnswer}
                    onChange={(event) => setSelectedAnswer(event.target.value)}
                    dir="auto"
                    maxLength={200}
                    required
                    disabled={pending !== null}
                  />
                </label>
              }
              <SubmitAnswerButton
                disabled={!selectedAnswer.trim()}
                isSubmitting={pending === "answer"}
              />
            </fieldset>
          </form>
          <section className="hint-panel" aria-label="Hints">
            <div>
              <p className="eyebrow">A different perspective</p>
              <p>Hints remaining: {hintsRemaining}</p>
            </div>
            <HintButton
              onClick={handleHint}
              disabled={pending !== null || hintsRemaining === 0}
              isLoading={pending === "hint"}
            />
            {hint && <HintBox hint={hint} />}
          </section>
        </>
      )}
    </main>
  )
}

function GamePage() {
  const { id } = useParams()
  return id ?
      <GameSession key={id} id={id} />
    : <Link to="/mysteries">Choose a mystery</Link>
}

export default GamePage
