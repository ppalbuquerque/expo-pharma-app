import { useCompletion } from "@ai-sdk/react";
import { fetch as expoFetch } from "expo/fetch";

const BASE_URL = "http://10.0.2.2:3000";

export function useChatbotHomeViewModel() {
  const { completion, input, setInput, complete, isLoading } = useCompletion({
    api: `${BASE_URL}/ai-search`,
    fetch: expoFetch as unknown as typeof globalThis.fetch,
  });

  const shouldShowCompletion = completion.length > 0;

  const onSendButtonPress = () => {
    complete(input);
  };

  return {
    completion,
    input,
    isLoading,
    shouldShowCompletion,
    setInput,
    onSendButtonPress,
  };
}
