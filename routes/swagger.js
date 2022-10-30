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
 *    Order:
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
 *
 */

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

/**
 *
 * @swagger
 * /api/v1/restaurants/:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get all orders created from this user.
 *    tags: [Restaurant functions with Auth]
 *
 *    responses:
 *      200:
 *        description: Response is a list of orders what made user in restaurant, with his restaurant and meal info.
 *
 *
 */
