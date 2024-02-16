import { Router } from 'express';
import userController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import authMiddleWare from '../../libs/routes/authMiddleWare';
const router = Router();


/**
 * @swagger
 * definitions:
 *  UserSchema:
 *    properties:
 *      _id:
 *        type: string
 *      originalId:
 *        type: string
 *      name:
 *        type: string
 *      email:
 *        type: string
 *      phoneNumber:
 *        type: string
 *      createdAt:
 *        type: string
 *      deletedAt:
 *        type: string
 *  Users:
 *    type: array
 *    items:
 *      $ref: '#/definitions/UserSchema'
 *  User:
 *    type: object
 *    $ref: '#/definitions/UserSchema'
 *  UserListResponse:
 *    properties:
 *      message:
 *        type: string
 *        example: Success
 *      status:
 *        type: integer
 *        example: 200
 *      data:
 *        $ref: '#/definitions/Users'
 *  UserByIdGetResponse:
 *    properties:
 *      message:
 *        type: string
 *        example: Success
 *      status:
 *        type: integer
 *        example: 200
 *      data:
 *        $ref: '#/definitions/User'
 *  UserToken:
 *    properties:
 *      message:
 *        type: string
 *      data:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 *      status:
 *        type: string
 */
router

/**
 * @swagger
 * /user-contacts-list:
 *  get:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *      - User
 *    description: Returns all the contacts
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Array of users
 *        schema:
 *          $ref: '#/definitions/UserListResponse'
 *      400:
 *        description: Not found
 *        schema:
 *          $ref: '#/definitions/UserListResponse'
 */

  .get(
    '/',
    authMiddleWare(),
    validationHandler(validation.get) as any,
    userController.get
  )
/**
 * @swagger
 * /user-contacts-list:
 *  post:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *      - User
 *    description: Create new contact
 *    parameters:
 *      - name: body
 *        in: body
 *        type: string
 *        description: Details to create new contact
 *        required: true
 *        schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: "test"
 *                  email:
 *                    type: string
 *                    example: "abc@gmail.com"
 *                  phoneNumber:
 *                    type: string
 *                    example: "0000000"
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Created contact
 *        schema:
 *          $ref: '#/definitions/UserByIdGetResponse'
 *      400:
 *        description: Not found
 */

  .post(
    '/',
    authMiddleWare(),
    validationHandler(validation.post) as any,
    userController.create
  )

/**
 * @swagger
 * /user-contacts-list:
 *  put:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *      - User
 *    description: Update user
 *    parameters:
 *      - name: body
 *        in: body
 *        type: string
 *        description: Details to Data to be update
 *        required: true
 *        schema:
 *                type: object
 *                properties:
 *                  originalId:
 *                    type: string
 *                    example: "614b07438f2ca904b4c2e1b2"
 *                  name:
 *                    type: string
 *                    example: "test"
 *                  email:
 *                    type: string
 *                    example: "abc@gmail.com"
 *                  phoneNumber:
 *                    type: string
 *                    example: "00000"
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Updated Data
 *        schema:
 *          $ref: '#/definitions/UserByIdGetResponse'
 *      400:
 *        description: Not found
 */
  .put(
    '/',
    authMiddleWare(),
    validationHandler(validation.Update)as any,
    userController.update
  )

/**
 * @swagger
 * /user-contacts-list/:id:
 *  delete:
 *    security:
 *      - APIKeyHeader: []
 *    tags:
 *     - User
 *    description: Delete User
 *    parameters:
 *     - name: id
 *       in: path
 *       type: string
 *       description: Details of deleted user
 *       required: true
 *    responses:
 *      200:
 *        description: User deleted Successfully
 */
  .delete(
    '/:id',
    authMiddleWare(),
    validationHandler(validation.delete)as any,
    userController.delete
  )

/**
 * @swagger
 * /user-contacts-list/login:
 *  post:
 *    tags:
 *      - Generate Token
 *    description: Returns all the user
 *    parameters:
 *      - name: body
 *        in: body
 *        type: string
 *        description: Generated Token
 *        required: true
 *        schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: "abc@gmail.com"
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Logging In
 *        schema:
 *          $ref: '#/definitions/UserToken'
 *      400:
 *        description: Not found
 */
  .post('/login', userController.login);

export default router;