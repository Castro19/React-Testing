import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
// Polyfill for TextEncoder and TextDecoder
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
