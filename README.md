# Management API

## Introduction

[IoT Manager] system created to control iots!

## Feature

- iots management

## How to run

1. install project project dependencies:

   `yarn install`

2. Copy `.env.example` located at the root folder to a new `.env` file and fill it with the credentials that you have set up on the past steps.

3. Copy `orm.config.example.json` located in the root folder to a new `orm.config.json` file and fill it with credentials.

4. to generate entities follow the steps below.

   `yarn prisma generate`

5. Run project:

   `yarn dev`
