# testingDifferentRamverk
This repository contains a mini project built with three different frontend frameworks: **Angular**, **Svelte** and **Vue**. The purpose of the project is to compare and explore how each framework handles common CRUD operations using the same custom-made REST API. 

Each version of the mini blog allows users to: 

- View all posts
- Create a new post
- Edit an existing post
- Delete a post

The API was created specifically for this project.

## 🚀 Getting Application started: 
Each framework is located in its own folder in the repository: 

- `AngularTest` – Angular version  
- `SvelteTest` – Svelte version  
- `VueTest` – Vue version  
- `API` – .NET Web API

To run any of the projects locally, follow these steps: 

1. **Clone the repository**
```bash 
git clone https://github.com/gytu24nn/testingDifferentRamverk.git
```

2. **Navigate to the API folder and start it**

Navigate to the API folder: 
```bash
cd API 
```

Start the API by doing:
```bash
dotnet run
```
or (for auto-reload on changes)
```bash
dotnet watch
```

3. **Open a new terminal and navigate to the desired framefork folder** 
```bash
cd AngularTest # or SvelteTest or VueTest
```

4. **Install dependencies**
```bash
npm install
```

5. **Start the framework:**

**Angular:**

```bash
ng serve
```

**Vue:**

```bash
npm run serve
```

**Svelte:** 
```bash
npm run dev
```
or 
```bash
npm run build 
```

## 🛠️ Technologies Used
This project was created to compare the development experience and implementation differences between popular frontend framework when building the same type of application. 

**Frontend:**
- Angular (AngularTest) - Typescript, Angular CLI 
- Svelte (SvelteTest) - Sveltekit 
- Vue (VueTest) - Vue 3, Vue CLI

**Backend**
- .NET Web API (.NET 9)-C#, RESTful architecture. 

**Common Features**
- CRUD operation (Create, Read, Update, Delete)
- Form handling
- API integration using fetch or native HTTP libraries
- Local development setup 





