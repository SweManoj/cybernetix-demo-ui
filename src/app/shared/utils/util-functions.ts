export function intToString(value) {
    if (new String(value).length > 3) {
        var suffixes = ["", "K", "M", "B", "T"];
        var suffixNum = Math.floor(("" + value).length / 3);
        var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
        if (shortValue % 1 != 0) {
            var shortNum = shortValue.toFixed(1);
        }
        return shortValue + suffixes[suffixNum];
    } else
        return value;
}

export function getRiskScoreColor(riskScore: number) {
    if (riskScore <= 65)
        return 'limegreen';
    else if (riskScore > 65 && riskScore <= 79)
        return 'darkorange';
    else
        return 'crimson';
}

export class User {
    public entityId: string;
    public fName: string;
    public lName: string;
    public lastgenerationtime: number;
    public riskscorebygrp: number;
}