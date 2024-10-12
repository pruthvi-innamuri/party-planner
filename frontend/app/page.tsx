'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MessageCircle, Music, Send, UserPlus, Clock, Plus, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

type Guest = {
  name: string;
  email: string;
}

type Venue = {
  name: string;
  description: string;
}

type Event = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

export default function PartyPlanningDashboard() {
  const [isAgentActive, setIsAgentActive] = useState(false)
  const [guestList, setGuestList] = useState<Guest[]>([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
    { name: 'David', email: 'david@example.com' }
  ])
  const [newGuest, setNewGuest] = useState('')
  const [venues] = useState<Venue[]>([
    { name: 'City Park', description: 'A spacious outdoor venue with beautiful greenery.' },
    { name: 'Beachside Resort', description: 'Luxurious resort with stunning ocean views.' },
    { name: 'Mountain Lodge', description: 'Cozy retreat nestled in the mountains.' },
    { name: 'Downtown Loft', description: 'Modern urban space with a city skyline backdrop.' }
  ])
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Guests Arrive', description: 'Welcome guests at the entrance', startTime: '18:00', endTime: '19:00' },
    { id: '2', title: 'Welcome Speech', description: 'Brief welcome address', startTime: '19:00', endTime: '19:30' },
    { id: '3', title: 'Dinner Served', description: 'Main course and dessert', startTime: '19:30', endTime: '21:00' },
    { id: '4', title: 'Dance Floor Opens', description: 'DJ starts playing music', startTime: '21:00', endTime: '23:00' },
    { id: '5', title: 'Cake Cutting', description: 'Celebratory cake cutting ceremony', startTime: '23:00', endTime: '23:30' },
    { id: '6', title: 'Event Concludes', description: 'Thank guests and farewell', startTime: '00:00', endTime: '00:30' }
  ])

  const addGuest = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGuest) {
      setGuestList([...guestList, { name: newGuest, email: '' }])
      setNewGuest('')
    }
  }

  const updateGuest = (index: number, updatedGuest: Guest) => {
    const updatedList = [...guestList]
    updatedList[index] = updatedGuest
    setGuestList(updatedList)
  }

  const addEvent = (newEvent: Event) => {
    setEvents([...events, newEvent].sort((a, b) => a.startTime.localeCompare(b.startTime)))
  }

  const updateEvent = (id: string, updatedEvent: Event) => {
    const updatedEvents = events.map(event => event.id === id ? updatedEvent : event)
    setEvents(updatedEvents.sort((a, b) => a.startTime.localeCompare(b.startTime)))
  }

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <h1 className="text-2xl font-bold">Party Planning Dashboard</h1>
          <Button onClick={() => setIsAgentActive(!isAgentActive)}>
            {isAgentActive ? 'Deactivate Agent' : 'Activate Agent'}
            <MessageCircle className="ml-2 h-4 w-4" />
          </Button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
          {isAgentActive && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Party Planning Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Ask me anything about party planning..." />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Spotify Playlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <Music className="h-12 w-12 text-gray-400" />
                  <span className="ml-2 text-gray-500">Embed Spotify playlist here</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invitation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-lg text-white text-center">
                  <h2 className="text-2xl font-bold mb-2">You're Invited!</h2>
                  <p className="mb-4">Join us for an unforgettable celebration</p>
                  <p>Date: TBD</p>
                  <p>Time: TBD</p>
                  <p>Location: TBD</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Event Timeline</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                  </DialogHeader>
                  <EventForm
                    event={{
                      id: Date.now().toString(),
                      title: '',
                      description: '',
                      startTime: '',
                      endTime: ''
                    }}
                    onSave={(newEvent) => {
                      addEvent(newEvent)
                    }}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {events.map((event) => (
                    <EventDialog key={event.id} event={event} onSave={updateEvent} onDelete={deleteEvent} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Available Venues</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {venues.map((venue, index) => (
                  <li key={index} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold">{venue.name}</h3>
                    <p className="text-gray-600">{venue.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>

      <aside className="w-64 bg-white border-l">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Guest List</h2>
          <form onSubmit={addGuest} className="flex mb-4">
            <Input
              value={newGuest}
              onChange={(e) => setNewGuest(e.target.value)}
              placeholder="Add guest"
              className="flex-1 mr-2"
            />
            <Button type="submit" size="icon">
              <UserPlus className="h-4 w-4" />
            </Button>
          </form>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {guestList.map((guest, index) => (
              <div key={index}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      {guest.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Guest Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={guest.name}
                          onChange={(e) => updateGuest(index, { ...guest, name: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={guest.email}
                          onChange={(e) => updateGuest(index, { ...guest, email: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                {index < guestList.length - 1 && <Separator />}
              </div>
            ))}
          </ScrollArea>
        </div>
      </aside>
    </div>
  )
}

function EventDialog({ event, onSave, onDelete }: { event: Event, onSave: (id: string, event: Event) => void, onDelete: (id: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded cursor-pointer">
          <Clock className="h-4 w-4 text-gray-500" />
          <div>
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-gray-500">{event.startTime} - {event.endTime}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <EventForm
          event={event}
          onSave={(updatedEvent) => {
            onSave(event.id, updatedEvent)
            setIsOpen(false)
          }}
          onDelete={() => {
            onDelete(event.id)
            setIsOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

function EventForm({ event, onSave, onDelete }: { event: Event, onSave: (event: Event) => void, onDelete?: () => void }) {
  const [formData, setFormData] = useState(event)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input id="startTime" name="startTime" type="time" value={formData.startTime} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input id="endTime" name="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="submit">Save</Button>
        {onDelete && (
          <Button type="button" variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        )}
      </div>
    </form>
  )
}