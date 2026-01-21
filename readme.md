# Chessdle

A Nuxt-based web app where players guess the Elo rating of real chess games.
Features a daily challenge and an unlimited random game mode.

## Overview

Chessdle challenges players to estimate the Elo rating of players based solely on how a game unfolds. You step through a real chess game and make your best guess.

Inspired by daily-guess games like wordle and chess analysis tools.

## Features
### Game Viewer with ELO guess mechanic

- Step-by-step move navigation
- Score based on distance from actual Elo

### Daily Challenge

- One curated game per day
- Same game for all players

### Random game

- Random games from chess.com API (large database of game)

### API endpoints

- /daily/[date] - Get daily challenge from [date]
- /random_game - Get random game from chess.com

## Techstack

- Nuxt 4 with nitro
- Tailwind CSS
- Chessground + chess.js

## How to run

1. Clone repository
2. Install dependencies: `bun install`
3. Fill in .env based on .env.example
4. Run it `nuxt dev`

