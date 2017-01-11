import { NAV_OPEN, NAV_CLOSE, NAV_TOGGLE, NAV_ACTIVE_CLASS, NAV_DEACTIVE_CLASS } from './actionTypes'

export function openNav() {
  return {
    type: NAV_OPEN
  }
}

export function closeNav() {
  return {
    type: NAV_CLOSE
  }
}

export function toggleNav() {
  return {
    type: NAV_TOGGLE
  }
}

export function navActiveClass() {
  return {
    type: NAV_ACTIVE_CLASS
  }
}

export function navDeactiveClass() {
  return {
    type: NAV_DEACTIVE_CLASS
  }
}
