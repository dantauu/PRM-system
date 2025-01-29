import { createEffect } from 'effector';
import { request } from '../../request';
import { Communication } from './types';

export const getAllByContactIdFx = createEffect((id: number) => request<never, Communication[]>(`communications/contact/${id}`, {}))
