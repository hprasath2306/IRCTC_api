
# IRCTC_Api

The app will allow a user to register and book the train tickets and the admin can add the trains and the user can also display how many seats are available between any 2 stations and the user can book a seat if the availability > 0 after logging in.


## Run Locally

Clone the project

```bash
  git clone https://github.com/hprasath2306/IRCTC_api
```

Go to the project directory

```bash
  cd IRCTC_api
```

Install dependencies

```bash
  npm install
```

Prisma command

```bash
  npx prisma migrate dev
```

Start the server

```bash
  npx tsx src/index.ts
```

