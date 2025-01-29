export function useHideHtmlTags(html: string): string {
    return html?.replace(/<[^>]*>/g, '');
}