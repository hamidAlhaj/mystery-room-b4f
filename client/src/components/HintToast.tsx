import { createElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { clearNotification } from "../store/hintSlice";

export default function HintToast() {
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootState) => state.hint.notification
  );

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 3500);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) return null;

  return createElement(
    "div",
    { className: "hint-toast", role: "status" },
    createElement("span", null, notification),
    createElement(
      "button",
      {
        type: "button",
        onClick: () => dispatch(clearNotification()),
      },
      "Close"
    )
  );
}