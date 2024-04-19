export function stopXSS(input: string): string {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}