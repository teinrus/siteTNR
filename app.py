from flask import Flask, request, jsonify, render_template
from flask_mail import Mail, Message

app = Flask(__name__)

# Конфигурация для Flask Mail
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = "novichenkoee@kuban-vino.ru"  # Замените на свою почту
app.config['MAIL_PASSWORD'] = "Butara83"  # Замените на свой пароль
mail = Mail(app)

# Маршрут для открытия страницы index.html
@app.route("/", methods=['GET'])
def index():
    return render_template("index.html")

# Маршрут для обработки формы обратной связи
@app.route("/home", methods=['POST'])
def home():
    if request.method == "POST":
        if request.form.get("modalSubmit"):
            name = request.form.get("name")
            phone = request.form.get("phone")
            email = request.form.get("email")
            message = request.form.get("message")

            # Отправка email с помощью Flask Mail
            msg = Message("Feedback from Website", sender="novichenkoee@kuban-vino.ru", recipients=["novichenkoee@kuban-vino.ru"])  # Замените на свою почту
            msg_body = f"Name: {name}\nPhone: {phone}\nEmail: {email}\nMessage: {message}"
            msg.body = msg_body
            mail.send(msg)

            return jsonify({"message": "Сообщение отправлено"})
    return jsonify({"message": "Не удалось отправить сообщение"})

if __name__ == "__main__":
    app.run(debug=True)
