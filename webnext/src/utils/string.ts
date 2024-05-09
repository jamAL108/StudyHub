export function youtubeExtractstring(url:string) {
    const match = url.match(/(?<=\bv=)[\w-]+/);
    return match ? match[0] : '';
}

export function shrinkText(text: string, maxLength: number) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength - 3) + '...';
    }
    return text;
}

export function formatViews(viewsString: string) {
    // Extract the number part from the string and remove commas
    const viewsNumber = parseInt(viewsString.replace(/[^0-9]/g, ''));

    // Convert the number into a shortened format
    // Convert the number into a shortened format
    const suffixes = ["", "k", "M", "B"];
    const suffixNum = Math.floor(Math.log10(viewsNumber) / 3);
    const shortValue = (viewsNumber / Math.pow(10, suffixNum * 3)).toPrecision(3);
    return shortValue + suffixes[suffixNum] + " views";
}