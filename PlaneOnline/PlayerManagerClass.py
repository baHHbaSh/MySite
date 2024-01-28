import json
from time import time
LastTime = time()
Mask = {
    "%": "◘", "з": "&", "e": "↔", "↨": "▼", "3": "Z", "♠": "∟", "~": "x", "U": "j", "s": "d", "w": "@", " ": "}", "↕": "7", "v": "▲", "P": "M", "o": "]", "д": "т", "г": "у", "Z": "C", "←": "6", "!": "b", "▬": "↑", ",": "ь", "(": "m", "э": "|", "ь": "G", "\"": "к", "W": "♀", "п": "а", "1": "v", "►": "s", "J": "1", "и": "ч", "R": "p", "¶": "r", "5": "{", "т": "N", "б": "D", "8": "♂", "H": "*", "X": "ы", "♪": "L", "♀": "▬", "{": "ж", "о": "↓", "§": "9", "ч": "ё", "х": "i", "○": "р", "&": ".", "S": "F", "q": "[", "↓": "K", "r": "д", "◘": """, "н": "J", "k": "☻", "t": "и", "♥": "<", "L": "a", "у": "й", "h": "з", "♂": "п", "ю": "¶", "B": "V", "C": "Q", "D": "S", "‼": "t", "ы": "б", "→": "←", "•": "l", "р": "^", "в": "о", "9": ",", "f": "f", "к": """, "c": ")", "й": "O", "☻": "T", "]": "4", "щ": "м", "G": "♠", "6": "ф", "№": "►", "4": "♫", "◙": "q", "V": "х", "[": ">", "/": "3", "\"": "H", "л": "я", "j": "g", "↑": "#", "♫": " ", "я": "/", "N": "`", "b": "5", "#": "‼", "K": "е", "y": "в", "E": "n", "u": "Y", "ф": "л", "l": "W", "с": "○", ";": ":", "@": "♣", "0": "↕", "ё": "◄", "◄": "u", "`": "ю", "^": "с", "Y": "z", "♦": "◙", "▼": "ц", "\\": "e", "7": "н", "i": "•", "d": "R", "$": "k", "F": ";", ")": "A", "*": "%", "T": "~", "∟": "c", "g": "☺", "↔": "E", "♣": "♦", "?": "P", "}": "I", ".": "0", "x": "U", "I": "!", "а": "→", "Q": "w", "|": "y", "<": "☼", "a": "$", ">": "X", "m": "8", "M": "o", "ц": "§", "2": "ъ", "ъ": "щ", "ж": "?", "☺": "♥", ":": "г", "☼": "\\", "▲": "↨", "O": "№", "ш": "(", "A": "ш", "м": "э", "p": "♪", "е": "2", "n": "B", "z": "h"
    }
class PlayerBD:
    BD = {}
    def __init__(self, filename) -> None:
        self.filename = filename
        self.LoadDataFile()

    def Login(self, username, password) -> int:
        self.Event()
        if username in self.BD:
            if self.BD[username][0] == password:
                return f"{self.BD[username][1]}"
            return "Неправильный пароль"
        return "Логин не обнаружен"

    def Register(self, username, password) -> int:
        self.Event()
        BaseInventory = {"Planes":["P-51"],"gun":["MG1"],"engine":["EP1"]}
        SelectedSetup = ["P-51","MG1","EP1",[20, 6000]]
        Money = 10_000
        if not username in self.BD:
            self.BD[username] = [password, BaseInventory, SelectedSetup, Money]
            return "+"
        return f"Пользователь с именем {username} уже существует"

    def SetScreen(self, screen, username, password) -> None:
        if username in self.BD:
            if self.BD[username][0] == password:
                if not screen in ["0", "1"]:
                    self.BD[username][1] = screen
                else:
                    self.BD[username][1] = "2"
    def SaveDataFile(self):
        with open(self.filename, "w", -1, "utf-8") as file:
            Text = self.Cipher(str(self.BD), True)
            Text = Text.replace("'", '"')
            file.write(Text)
        print(self.BD)

    def LoadDataFile(self):
        LastTime = time()
        try:
            with open(self.filename, "r", -1, "utf-8") as file:
                Text = file.read()
                Text = self.Cipher(Text)
                self.BD = json.loads(Text)
        except FileNotFoundError:
            self.SaveDataFile()
        except json.decoder.JSONDecodeError:
            print(Text)
    
    def Event(self):
        global LastTime
        if LastTime + 600 < time():
            LastTime = time()
            self.SaveDataFile()

    def Cipher(self, Text, DirectionTo = False) -> str:
        Result = ""
        if DirectionTo:
            for x in Text:
                try:
                    Result += Mask[x]
                except KeyError:
                    Result += x
        else:
            for x in Text:
                try:
                    Result += {v: k for k, v in Mask.items()}[x]
                except KeyError:
                    Result += x
        return Result
    
if __name__ == "__main__":
    App = PlayerBD("d")
    print(App.Login("Nya", "Lol"))
    print(App.Login("Nay", "Me0w"))
    print(App.Login("Nya", "Me0w"))
    print(App.BD)
    App.SaveDataFile()