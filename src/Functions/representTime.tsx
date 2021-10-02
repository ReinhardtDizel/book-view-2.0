import rusMonth from "../Locales/Rus";

export function representTime(d: Date | undefined) {
    if(d == undefined) {
        return undefined;
    }
    let date: string = d as unknown as string;
    date = date.substring(0,10);
    date = date.replaceAll('-','');

    let year: string = date.substring(0,4);
    let month: string = date.substring(4,6);
    let day: string = date.substring(6,8);

    if(day.charAt(0) == "0") {
        day = day.replaceAll('0','');
    }
    if(month.charAt(0) == "0") {
        month = month.replaceAll('0','');
    }

    let final = day + " " + rusMonth[Number(month)] + " " + year;
    return final;
}