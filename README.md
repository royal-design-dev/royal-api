# Документация по бэкенду

## Как развернуть локально?

Все достаточно просто.\
Есть два варианта запуска приложения:

1. Dev-local
2. Dev-docker
3. Prod-docker

Определяемся с типом запуска и стартуем!

> Перед каким-либо запуском необходимо сделать из `env.example => .env`

> Важно! Если мы разрабатываем локально, нужно раскомментить 4-ю строчку нашего env и поставить нужное значение для переменной. Примеры описаны там же

### Запускаем базу данных

1. Открываем `bash`
2. Переходим в папку `docker => cd docker`
3. Пишем `docker-compose up --build -d db`

> Таким образом докер создает контейнер с базой данных, к которой мы будем иметь доступ по порту `5432`

### **_Dev-local_**

1. Устанавливаем и используем версию `node 14.19.0`
2. Устанавливаем все зависимости `npm i`
3. Запускаем приложение `npm run start:dev`

### **_Dev-docker_**

0. **_Копируем_** сазданный файлы `.env` в папку `docker`
1. Открываем `bash`
2. Переходим в папку `docker => cd docker`
3. Пишем `docker-compose up --build -d backend_dev`

> В случае **_Dev-docker_** сборки, у нас появляется возможность лайв кодинга. Все изменения в коде докер будет отслеживать и использовать хот-релоад для сборки.

### **_Prod-docker_**

0. **_Копируем_** сазданный файлы `.env` в папку `docker`
1. Открываем `bash`
2. Переходим в папку `docker => cd docker`
3. Пишем `docker-compose up --build -d backend_prod`

В случаях сборки в докере у нас поднимается контейнер, который запускает приложение на `5000` порту, то есть доступ мы имеем по адресу http://localhost:5000/api/docs/ - `SWAGGER`.

### **Миграции**

После того, как контейнер с приложением запущен, нужно поставить миграции командой - `docker-compose exec backend_<dev | prod> npm run migration:run`