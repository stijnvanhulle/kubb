export type User = {
  /**
   * @type integer | undefined int64
   * @example 10
   */
  id?: number | undefined
  /**
   * @type string | undefined
   * @example theUser
   */
  username?: string | undefined
  /**
   * @type string | undefined
   * @example John
   */
  firstName?: string | undefined
  /**
   * @type string | undefined
   * @example James
   */
  lastName?: string | undefined
  /**
   * @type string | undefined
   * @example john@email.com
   */
  email?: string | undefined
  /**
   * @type string | undefined
   * @example 12345
   */
  password?: string | undefined
  /**
   * @type string | undefined
   * @example 12345
   */
  phone?: string | undefined
  /**
   * @description User Status
   * @type integer | undefined int32
   * @example 1
   */
  userStatus?: number | undefined
}
