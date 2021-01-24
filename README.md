# Mackogneur

## ℹ️ About us
Mackogneur is a Discord bot.  
Developed by Saibe1111 for a French Discord server '[LA FAMILIA](https://discord.com/invite/wV8JeNSEFZ)'.

## 🚀 Installation
```shell
# Installation of dependencies
$ npm install
```

## ⚙️ Configuration
Copy or Rename to and fill out the values: __config_example.json__ __config.json__

> For the time being it is also necessary to configure the database manually.


## 💾 Use
```shell
# Launch the bot
$ node index.js

# Launch the bot using pm2 script
$ sh start.sh
```

## 📝 Commands
### ⚠ Note
> The default prefix is ':'  
> {arg} for the necessary arguments  
> (arg) for optional arguments

### All users

* Get information about commands.
     * `:help {@Pokemon}`
     * `:h {@Pokemon}`

* Get information about a user.
     * `:userinfo (ID or @)`
     * `:useri (ID or @)`
     * `:ui (ID or @)`

### Admins
* Get information about the bot.
     * `:ping {@Pokemon}`
     * `:p {@Pokemon}`
* Closes the server channels.
     * `:channelslock {on/off}`
     * `:chl {on/off}`

## 🧾 Others features

* Log message at bot connection.
* Admins receive a ping when an important user sends a message.
* New users receive a welcome message with a personalized image.
* New users receive a question about the by-law and must answer it to get the default role.

## 🤝 Dependencies

The list of project dependencies:

* canvas
* cpu-stat
* discord.js
* moment
* os
* sqlite3



## 📕 License

[MIT](https://choosealicense.com/licenses/mit/)

## 📌 Other

This project respects the [gitmoji](https://gitmoji.dev/) conventions.