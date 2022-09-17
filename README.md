# Blanho Blog

## Table of Content

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Technology](#technology)
- [Description](#description)
- [Features](#features)
- [Entity](#entity)
- [License](#license)

## Introduction

A Blog website uses NodeJs, ExpressJs, and Mongoose.
Please read configuration before running this project to get rid of errors

## Description

The website allows you to post your ideas, opinions with a lot of essential features using ExpressJS

By sharing your thoughts to Blanho Blog, the viewer also comments your posts as well as discussing some perspectives together.
You can't obtain the UI functionality into my project because I've been building this project for showing up to recruiter that I can have a job.

I'll supplement UI functionality in MERN STACK Project.
Follow for more: [blanho](https://github.com/blanho)

## Configuration

To run this application, you have to follow my own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables that you must set up your variables in ==.env== file before running your apps.

Below are the instructions that I guide you how to run my app easily to get rid of unessential errors

- Install Package: npm install. Don't be worried If you have some errors.
- PORT: A port is a virtual point where network connections start and end
- MONGO_URI: this is the connection string of your MongoDB Atlas database.
- JWT_SECRET_KEY: SECRET KEY helps you sign your token as well as verify when users log in

When you finish your configuration setup, you can run: ==npm start== in the terminal to start the server.

## Technology

The application has been built with:

- NodeJS: 8.5.5
- ExpressJS: 4.18.1
- MongoDB: 5.0.9
- JSON WEB TOKEN: 8.5.1
- NODEMAILER: 6.7.8
- COOKIE-PARSER: 1.4.6

## Features

The application allows users to post, comment, share their thoughts thorough using some below functionality.

Blan Blog uses ==accessToken==, ==refreshToken== attached to Cookie for authentication

Users can do some functionality below:

- Create an account by verifying email, login, or logout,
- Reset password by verifying email
- Create, Update, Get, Delete Blogs, and also Get Single Post
- Update personal profile information
- Create, Get, Update, Delete Comments and also post their comments to another users's blog

Admin can do some functionality below:

- Login and logout
- Reset password
- View all information stored database.
- Create, Update, Delete, Get All Users, Categories, Comments

## Database

All the models can be found in the models directory using Mongoose

## User

- firstName(String)
- lastName(String)
- email(String)
- role(String)
- verificationToken(String)
- verified(Date)
- isVerified(Boolean)
- passwordToken(String)
- passwordExpiration(Date)

## Category

- name(String)

## Post

- title(String)
- description(String)
- image(String)

## Comment

- comment(String)

## Token

- refreshToken(String)
- ip(String)
- userAgent(String)
- isValid(Boolean)

## License

- [![License](https://img.shields.io/:License-MIT-blue.svg?style=flat-square)](https://www.linkedin.com/in/blanho/)

- Copyright 2022 © [Hồ Bảo Lân](https://github.com/blanho)
