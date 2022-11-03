/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: write a name for your account
 *        email:
 *          type: string
 *          description: email to join later in this account
 *        password:
 *          type: string
 *          description: min character 8 digits.
 *      required:
 *          - username
 *          - email
 *          - password
 *      example:
 *           username: John Doe
 *           email: John@gmail.com
 *           password: pass1234
 *    Restaurant:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: write a name for your restaurant
 *        address:
 *          type: string
 *          description: address of restaurant
 *        rating:
 *          type: string
 *          description: type a rating of your restaurant of 1 / 5.
 *      required:
 *          - name
 *          - address
 *          - rating
 *      example:
 *           name: restaurant testing
 *           address: address-testing1234
 *           rating: 5
 *
 *
 *    Meals:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: write a name for your new meal
 *        price:
 *          type: integer
 *          description: write the price to your meal
 *      required:
 *          - name
 *          - price
 *      example:
 *           name: hamburguer
 *           price: 17
 *
 *    Orders:
 *      type: object
 *      properties:
 *        quantity:
 *          type: integer
 *          description: Write a quantity of food.
 *        mealId:
 *          type: integer
 *          description: Write meal's id
 *      required:
 *          - quantity
 *          - mealId
 *      example:
 *           quantity: 6
 *           mealId: 3
 */

//User documentation

/**
 * @swagger
 * /api/v1/users/singup:
 *  post:
 *     summary: Create a new user account in app
 *     tags: [User functions]
 *     requestBody:
 *      required: true
 *      description: "Password min 8 digits, name must be string, email must be string"
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *     responses:
 *      201:
 *        description: Your account has been created
 *
 */

/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *     summary: Logg in app.
 *     tags: [User functions]
 *     requestBody:
 *      description: "Type credentials and username to logg in."
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *                  example:
 *                      email: John@gmail.com
 *                      password: pass1234
 *
 *
 *     responses:
 *      200:
 *        description: You signed in to your account
 *
 */

/**
 *
 * @swagger
 * /api/v1/users/:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get all user registered in this app.
 *    tags: [User functions with Authentication]
 *
 *    responses:
 *      200:
 *        description: succesful process
 *        content:
 *          application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 *
 *
 */

/**
 *
 * @swagger
 * /api/v1/users/orders:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get all orders created from this user.
 *    tags: [User functions with Authentication]
 *
 *    responses:
 *      200:
 *        description: Response is a list of orders what made user in restaurant, with his restaurant and meal info.
 *
 *
 */

/**
 *
 * @swagger
 * /api/v1/users/orders/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get a specify order with his id.
 *    tags: [User functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: Order id
 *
 *    responses:
 *      200:
 *        description: Details of a specify orders.
 *
 *
 */

/**
 *
 * @swagger
 * /api/v1/users/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update user account.
 *    tags: [User functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: User id
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      username:
 *                          type: string
 *                      email:
 *                          type: string
 *
 *    responses:
 *      200:
 *        description: Succesful.
 *
 *
 */

/**
 *
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete a user account.
 *    tags: [User functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: User id
 *    responses:
 *      200:
 *        description: User account desactivated.
 *
 *
 */

// Restaurant documentation

/**
 *
 * @swagger
 * /api/v1/restaurants/:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get all restaurants registered in the app with his information.
 *    tags: [Restaurant functions]
 *
 *    responses:
 *      200:
 *        description: Response a list with all restaurants.
 *
 *
 */

/**
 *
 * @swagger
 * /api/v1/restaurants/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get a specify restaurant with his id.
 *    tags: [Restaurant functions]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: Restaurant id
 *    responses:
 *      200:
 *        description: Restaurant info found.
 *
 *
 */

/**
 * @swagger
 * /api/v1/restaurants/:
 *  post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new restaurant in app.
 *     tags: [Restaurants functions with Authentication]
 *     requestBody:
 *      description: "write restaurant info."
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Restaurant'
 *
 *
 *     responses:
 *      200:
 *        description: restaurant has been created in app
 *
 */

/**
 *
 * @swagger
 * /api/v1/restaurants/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update info of a restaurant created in app.
 *    tags: [Restaurants functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: restaurant id
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      address:
 *                          type: string
 *
 *    responses:
 *      200:
 *        description: Updated restaurant.
 *
 *
 */

/**
 *
 * @swagger
 * /api/v1/restaurants/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete a restaurant.
 *    tags: [Restaurants functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: restaurant id
 *    responses:
 *      200:
 *        description: Restaurant has been desactivated.
 *
 *
 */

// Restaurant's reviews

/**
 * @swagger
 * /api/v1/restaurants/reviews/{id}:
 *  post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a review to a restaurant.
 *     tags: [Restaurant's reviews functions with Authentication]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: restaurant id
 *     requestBody:
 *      description: "write restaurant info."
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      comment:
 *                          type: string
 *                      rating:
 *                          type: integer
 *
 *
 *     responses:
 *      200:
 *        description: Review has been created
 *
 */

/**
 *
 * @swagger
 * /api/v1/restaurants/reviews/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update review of a restaurant.
 *    tags: [Restaurant's reviews functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: review id
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      comment:
 *                          type: string
 *                      rating:
 *                          type: integer
 *
 *    responses:
 *      200:
 *        description: Review has been updated.
 *
 *
 */

/**
 *
 * @swagger
 * /api/v1/restaurants/reviews/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete a review of a restaurant.
 *    tags: [Restaurant's reviews functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: review id
 *    responses:
 *      200:
 *        description: review has been desactivated.
 *
 *
 */

// Meals documentation

/**
 *
 * @swagger
 * /api/v1/meals/:
 *  get:
 *    summary: Get all meals registered in the app with his information.
 *    tags: [Meals functions]
 *
 *    responses:
 *      200:
 *        description: Response a list with all meals.
 *
 *
 */

/**
 *
 * @swagger
 * /api/v1/meals/{id}:
 *  get:
 *    summary: Get a specify meal with his id.
 *    tags: [Meals functions]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: meal id
 *    responses:
 *      200:
 *        description: Meal info found.
 *
 *
 */

/**
 * @swagger
 * /api/v1/meals/{id}:
 *  post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new meal in a restaurant.
 *     tags: [Meals functions with Authentication]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: restaurant id
 *     requestBody:
 *      description: "write meal info."
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Meals'
 *
 *
 *     responses:
 *      200:
 *        description: Meal has been created in restaurant.
 *
 */

/**
 *
 * @swagger
 * /api/v1/meals/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update meal info.
 *    tags: [Meals functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: meal id
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      price:
 *                          type: integer
 *
 *    responses:
 *      200:
 *        description: Meal info has been updated.
 *
 *
 */

/**
 *
 * @swagger
 * /api/v1/meals/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete a meal of a restaurant.
 *    tags: [Meals functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: meal id
 *    responses:
 *      200:
 *        description: Meal has been desactivated.
 *
 *
 */

// Orders documentation

/**
 *
 * @swagger
 * /api/v1/orders/me:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get all orders created on this account.
 *    tags: [Orders functions with Authentication]
 *
 *    responses:
 *      200:
 *        description: Response a list with all meals.
 *
 *
 */

/**
 * @swagger
 * /api/v1/orders/:
 *  post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new order in a restaurant.
 *     tags: [Orders functions with Authentication]
 *     requestBody:
 *      description: "write order info."
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Orders'
 *
 *
 *
 *     responses:
 *      200:
 *        description: Order has been created in restaurant.
 *
 */

/**
 *
 * @swagger
 * /api/v1/orders/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Update meal info to COMPLETED.
 *    tags: [Orders functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: order id
 *
 *    responses:
 *      200:
 *        description: Order info has been updated.
 *
 *
 */

/**
 *
 * @swagger
 * /api/v1/orders/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Update meal info to CANCELLED.
 *    tags: [Orders functions with Authentication]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: order id
 *
 *    responses:
 *      200:
 *        description: Order info has been updated.
 *
 *
 */
