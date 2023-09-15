const BackendDevBaseLink = 'http://localhost:2012/api'
const BackendProdBaseLink = 'https://fitrecord.id/api'
function GetBackendBaseLink() {
  if (process.env.NODE_ENV === 'development') {
    return BackendDevBaseLink
  } else if (process.env.NODE_ENV === 'production') {
    return BackendProdBaseLink
  }
}

class BackendLink {
  BaseLink
  constructor() {
    this.BaseLink = `${GetBackendBaseLink()}`
  }
}

class BackendGymLink {
  BaseLink
  constructor(Gym) {
    this.BaseLink = `${GetBackendBaseLink()}/gym/${Gym}`
  }

  AdminLink() {
    return `${this.BaseLink}/admin`
  }

  AdminLoginLink() {
    return `${this.BaseLink}/admin/login`
  }

  AdminAuthLink() {
    return `${this.BaseLink}/admin/auth`
  }

  AdminMakeMemberLink() {
    return `${this.BaseLink}/admin/makeMember`
  }

  AdminEditMemberLink() {
    return `${this.BaseLink}/admin/editMember`
  }

  AdminRemoveMemberLink(email) {
    return `${this.BaseLink}/admin/removeMember/${email}`
  }

  AdminUsersListLink() {
    return `${this.BaseLink}/admin/usersList`
  }

  AdminMembersListLink() {
    return `${this.BaseLink}/admin/membersList`
  }

  AdminWorkoutsListLink() {
    return `${this.BaseLink}/admin/workoutsList`
  }

  AdminAddWorkoutLink() {
    return `${this.BaseLink}/admin/addWorkout`
  }

  AdminRemoveWorkoutLink(id) {
    return `${this.BaseLink}/admin/removeWorkout/${id}`
  }
}

class BackendDataLink {
  BaseLink
  constructor(environment) {
    this.BaseLink = `${GetBackendBaseLink(environment)}/data`
  }

  DataWorkoutsLink() {
    return `${this.BaseLink}/workoutsList`
  }
}

export { BackendLink, BackendGymLink, BackendDataLink }
