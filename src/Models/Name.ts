/** <P>Name Model:
 * <UL>
 * <LI> full_name
 * <LI> first_name
 * <LI> middle_name
 * <LI> last_name
 * <LI> short_name
 * </UL>
 */
export interface Name {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    shortName?: string;
    fullName?: string;
}