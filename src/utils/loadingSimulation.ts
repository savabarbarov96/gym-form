import { Dispatch, SetStateAction } from "react";
import { AppState } from "@/types/survey";

export const updateLoadingAfterWebhook = (
  success: boolean,
  setAppState: Dispatch<SetStateAction<AppState>>,
  setLoadingProgress: Dispatch<SetStateAction<number>>
): Promise<void> => {
  return new Promise((resolve) => {
    if (success) {
      // When the webhook succeeds, we let the loading continue - we don't modify it
      // as it will complete in 120 seconds anyway and go to the success state
      setTimeout(() => {
        // We'll resolve the promise after most of the loading is done
        // This just handles successful webhook scenario
        resolve();
      }, 1000);
    } else {
      // If webhook failed, show error
      setAppState("results");
      resolve();
    }
  });
};
