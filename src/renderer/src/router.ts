// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/about`
  | `/combinedview`
  | `/history`
  | `/layouts/header`
  | `/layouts/modelpick`
  | `/photo`
  | `/photo/confirmphoto`
  | `/photo/send`
  | `/photo/setting`

export type Params = {}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
