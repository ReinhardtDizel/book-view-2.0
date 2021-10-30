import {Address} from "./Address";
import {Role} from "./Role";
/** <P>User Model:
 * <UL>
 *
 * <LI>username  string
 * <LI>password  string
 * <LI>name {}
 * <LI>address {}
 * <LI>roles []
 * <LI>email string
 * <LI>createdAt  TIMESTAMP(6)
 * <LI>id string
 *
 * </UL>
 */
export interface User {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
    address?: Address;
    roles?: Role[];
}
