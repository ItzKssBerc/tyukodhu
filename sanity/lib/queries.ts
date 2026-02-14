import { groq } from 'next-sanity'

export const OLDALBEALLITASOK_QUERY = groq`*[_type == "oldalbeallitasok"][0] {
  oldalemblema,
  fokepcarousel
}`

export const LIVE_STREAM_QUERY = groq`*[_type == "elokozvetites"][0] {
  offlinebanner,
  streamurl,
  iframe,
  adasban
}`

export const HIREK_QUERY = groq`*[_type == "hir"] | order(datum desc) {
  _id,
  cim,
  slug,
  hirindexkep,
  hirkategoria,
  datum,
  hircimke
}`

export const HIR_SLUG_QUERY = groq`*[_type == "hir" && slug.current == $slug][0] {
  _id,
  cim,
  slug,
  hirindexkep,
  hirkategoria,
  datum,
  hircimke,
  hirtartalom
}`

export const KEP_QUERY = groq`*[_type == "kep"] | order(_createdAt desc) {
  _id,
  kepcim,
  kep,
  album
}`

export const DOKUMENTUM_QUERY = groq`*[_type == "dokumentum"] | order(_createdAt desc) {
  _id,
  dokumentumcim,
  "fajlUrl": fajlok[0].asset->url,
  kategoria,
  _createdAt
}`

export const SZAVAZAS_QUERY = groq`*[_type == "szavazas"] | order(_createdAt desc) {
  _id,
  szavazascim,
  valaszok,
  ismetles,
  aktiv,
  _createdAt
}`

export const HELYSZIN_QUERY = groq`*[_type == "helyszin"] {
  _id,
  helyszinnev,
  koordinata,
  helyszinikon,
  leiras,
  kategoria
}`

export const SZEMELY_QUERY = groq`*[_type == "szemely"] | order(nev asc) {
  _id,
  nev,
  titulus,
  kep,
  kategoria,
  bizottsagok
}`
