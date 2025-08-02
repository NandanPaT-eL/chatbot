import google.generativeai as genai
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

# Initialize Gemini
genai.configure(api_key="AIzaSyCJ9wRVDSyJ46kmc_swxlYj-JmHTBEs8Q0")

class ActionHandleUnknownQuestion(Action):
    def name(self) -> str:
        return "action_handle_unknown_question"

    async def run(self, dispatcher: CollectingDispatcher,
                  tracker: Tracker,
                  domain: DomainDict):

        user_question = tracker.latest_message.get("text")
        try:
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(user_question)
            answer = response.text
        except Exception as e:
            answer = "Sorry, I'm having trouble finding an answer to that right now."

        dispatcher.utter_message(text=answer)
        return []