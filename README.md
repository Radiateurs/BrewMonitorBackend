# Beer Monitor 

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

### The hardware

The arduino board used will soon be available on its own personal Github repo. Hold tight. (In the mean time, I will soon release a schema of the electronic on this readme).
THe board is an NodeMCU (1.0) - ESP8266. It's great because you hqve both Bluetooth AND Wifi natively on it. The only Issue I personally face with this is the 3.3V limitation but you can always find a work around (Like sticking 5V in it and hope it doesn't burns the board - /!\ Spoiler /!\ : It doesn't).

For the captors I'm using currently using a temperature captor [DS18B20](https://datasheets.maximintegrated.com/en/ds/DS18B20.pdf). [That one](https://www.amazon.fr/gp/product/B01MZG48OE/ref=ppx_yo_dt_b_asin_title_o03_s00?ie=UTF8&psc=1) to be specific. It is great for that specific task because it is food proof. It is also easy to clean AND easy to work with.

### Dependencies

The whole project uses [Typescript](https://www.typescriptlang.org/) as the frameware.

The main framwork is [Express](https://expressjs.com/) because it does the job plenty enough and I also like the use of controllers and routes. (Maybe because it is the only one I know and never took the time to look to another framework ? - IDK). 

[TypeORM](https://typeorm.io/#/) is used for the data manipulation. Very usefull tool that I just discovered. Totally recommand.
