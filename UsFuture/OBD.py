import json
import datetime

class HumanBD:
    def __init__(self):
        self.BD = {"users":{"Администратор":{"admin":"11"}, "Кладовщик":{}, "Инженер":{}, "Тестировщик":{}, "Руководитель производства":{}, "Руководитель отдела закупок":{}, "Менеджер по закупкам":{}, "Руководитель отдела продаж":{}, "Менеджер по продажам":{},}, "log":[], "details":[], "robots":[]}

    def SaveData(self):
        with open("FBD", "w", encoding="utf-8") as file:
            json.dump(self.BD, file)

    def LoadData(self):
        with open("FBD", "r", encoding="utf-8") as file:
            self.BD = json.load(file)

    def AddAccount(self, RoleId, username, password):
        RoleId = int(RoleId)
        if RoleId <= len(self.GetRoleList()) - 1:
            self.BD["users"][self.GetRoleList()[RoleId]][username] = password
            self.BD["log"].append(f"New user: {username} with role {self.GetRoleList()[RoleId]} and password - {password}")
    
    def Login(self, username, password):
        print(self.BD)
        for role in self.BD["users"]:
            if username in self.BD["users"][role]:
                if self.BD["users"][role][username] == password:
                    self.AddLog(username, role)
                    return role
        return "0"
    
    def GetRoleList(self):
        return ["Администратор", "Кладовщик", "Инженер", "Тестировщик", "Руководитель производства", "Руководитель отдела закупок", "Менеджер по закупкам", "Руководитель отдела продаж", "Менеджер по продажам"]

    def AddLog(self, nick, role):
        self.BD["log"].append(f"{datetime.datetime.now()} - {nick}[{role}]: Entered")
    
    def GetRobots(self):
        return self.BD["robot"]
    
    def SetRobots(self, NewStr):
        self.BD["robot"] = json.loads(NewStr)

    def GetDetail(self):
        return self.BD["details"]

    def SetDetail(self, NewStr):
        self.BD["details"] = json.loads(NewStr)