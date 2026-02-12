'use client'

import React, { useEffect, useRef, useState } from 'react'
import { set, unset } from 'sanity'
import { Box, Button, Flex, Grid, Stack, Text, TextInput } from '@sanity/ui'
// Import CSS but not the code at top-level
import 'leaflet/dist/leaflet.css'

export default function LeafletInput(props: any) {
    const { value, onChange } = props
    const mapRef = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const markerRef = useRef<any>(null)
    const LRef = useRef<any>(null)

    const isMounted = useRef(true)

    // Local state for inputs
    const [lat, setLat] = useState<string>(value?.lat?.toString() || '')
    const [lng, setLng] = useState<string>(value?.lng?.toString() || '')

    // Synchronize local state with props
    useEffect(() => {
        isMounted.current = true
        setLat(value?.lat?.toString() || '')
        setLng(value?.lng?.toString() || '')

        if (mapRef.current && LRef.current) {
            const L = LRef.current
            if (value?.lat && value?.lng) {
                const newPos: [number, number] = [value.lat, value.lng]
                if (markerRef.current) {
                    markerRef.current.setLatLng(newPos)
                } else {
                    markerRef.current = L.marker(newPos).addTo(mapRef.current)
                }
                mapRef.current.setView(newPos)
            } else if (markerRef.current) {
                markerRef.current.remove()
                markerRef.current = null
            }
        }

        return () => {
            isMounted.current = false
        }
    }, [value?.lat, value?.lng])

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return

        // Only load Leaflet on the client
        import('leaflet').then((L) => {
            // Check if still mounted and map not already initialized
            if (!isMounted.current || mapRef.current) return

            LRef.current = L

            const initialLat = value?.lat || 47.8447
            const initialLng = value?.lng || 22.5029

            // Double check container exists
            if (!containerRef.current) return

            const map = L.map(containerRef.current!).setView([initialLat, initialLng], 13)
            mapRef.current = map

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map)

            // Fix for markers
            const DefaultIcon = L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            })

            if (value?.lat && value?.lng) {
                markerRef.current = L.marker([value.lat, value.lng], { icon: DefaultIcon }).addTo(map)
            }

            map.on('click', (e) => {
                const { lat, lng } = e.latlng
                const nextValue = { _type: 'geopoint', lat: lat, lng: lng }
                onChange(set(nextValue))
            })
        })

        return () => {
            if (mapRef.current) {
                mapRef.current.remove()
                mapRef.current = null
            }
        }
    }, [])

    const handleInputChange = () => {
        const latNum = parseFloat(lat)
        const lngNum = parseFloat(lng)
        if (!isNaN(latNum) && !isNaN(lngNum)) {
            const nextValue = { _type: 'geopoint', lat: latNum, lng: lngNum }
            onChange(set(nextValue))
        } else if (lat === '' && lng === '') {
            onChange(unset())
        }
    }

    return (
        <Stack space={3}>
            <div
                ref={containerRef}
                className="leaflet-input-map"
                style={{
                    height: '400px',
                    width: '100%',
                    borderRadius: '8px',
                    zIndex: 0,
                    border: '1px solid #ccc',
                    overflow: 'hidden',
                    background: '#f0f0f0'
                }}
            />

            <Grid columns={[1, 2]} gap={3}>
                <Stack space={2}>
                    <Text size={1} weight="semibold">Szélesség (Lat)</Text>
                    <TextInput
                        value={lat}
                        onChange={(e: any) => setLat(e.currentTarget.value)}
                        onBlur={handleInputChange}
                        placeholder="pl. 47.8447"
                    />
                </Stack>
                <Stack space={2}>
                    <Text size={1} weight="semibold">Hosszúság (Lng)</Text>
                    <TextInput
                        value={lng}
                        onChange={(e: any) => setLng(e.currentTarget.value)}
                        onBlur={handleInputChange}
                        placeholder="pl. 22.5029"
                    />
                </Stack>
            </Grid>

            <Flex justify="flex-end">
                <Button
                    fontSize={1}
                    padding={2}
                    text="Koordináták törlése"
                    tone="critical"
                    onClick={() => {
                        setLat('')
                        setLng('')
                        onChange(unset())
                        if (markerRef.current) {
                            markerRef.current.remove()
                            markerRef.current = null
                        }
                    }}
                />
            </Flex>
        </Stack>
    )
}
