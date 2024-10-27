import { TransformStream } from 'node:stream/web';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

// @ts-expect-error Slight differences in APIs but it's fine
global.TransformStream = TransformStream;
