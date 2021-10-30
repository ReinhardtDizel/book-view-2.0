/**<P>Address Model:
 * <UL>
 * <LI> addressLine1
 * <LI> addressLine2
 * <LI> country
 * <LI> city
 * <LI> zip_code
 * </UL>
 */
export interface Address {
    addressLine1?: string;
    addressLine2?: string;
    country?: string;
    city?: string;
    zip_code?: number;
}