from datetime import datetime

for i in range(1, 11):
    print(i)


num1 = float(input("Введіть перше число: "))
num2 = float(input("Введіть друге число: "))
num3 = float(input("Введіть третє число: "))

average = (num1 + num2 + num3) / 3
print(f"Середнє значення: {average}")


birth_year = int(input("Введіть ваш рік народження: "))
current_year = datetime.now().year
age = current_year - birth_year
print(f"Вам зараз повних {age} років.")


class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year

    def display_info(self):
        print(f"Назва: {self.title}")
        print(f"Автор: {self.author}")
        print(f"Рік видання: {self.year}")

book1 = Book("Десять негренят", "Агата Крісті", 1939)
book1.display_info()