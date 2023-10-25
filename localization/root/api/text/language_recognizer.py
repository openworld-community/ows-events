from polyglot.detect import Detector


class LanguageRecognizer:
    @staticmethod
    def recognize_language(text):
        try:
            detected_text = Detector(text)
        except Exception as e:
            print(e)
            return "Sorry, something went wrong. Try again later"
        languages = [
            language.name.upper()
            for language in detected_text.languages
            if language.name != "un"
        ]
        return languages


languageRecognizer = LanguageRecognizer()
