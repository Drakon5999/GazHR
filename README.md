# Решение кейса Газпромбанка хакатона Цифровой Прорыв.
Наш сервис - комплексная система для HR позволяющая облегчить задачи работников и автоматически выполнять рутинные операции за счет продвинутых средств искусственного интеллекта. Наше решение позволяет заказчику создать подробное описание вакансии на основе пространного описания, не держа в голове никаких шаблонов и форм, отправить на платформы поиска работы, вести кандидатов на вакансию через всю процедуру без необходимости вспоминать или записывать какие-то детали.

Ссылка на [Demo](http://87.239.110.212:3000/).

Описание [REST API](https://docs.google.com/document/d/1aG3cklhCz38KzjXIwHMR9scZhQUmJSgfSgIKGWBAI0E/edit)


### Запуск backend-части сервиса:
Запуск через Docker:
```bash
docker-compose up -d —build
```

### Запуск fronend-части сервиса:
```bash
cd gazhr_front
npm i
npm run start
```

### Установка зависимостей на Ubuntu
```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose npm
```