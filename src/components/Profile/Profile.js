import React from 'react'
import { getProfile } from '../../api'
import { getLocalStorage } from '../../utils/utils'

const Profile = () => {

    const token = getLocalStorage('token')
    const profileInfo = await getProfile(token)
    const firstName = profileInfo.firstName
    const lastName = profileInfo.lastName
    const email = profileInfo.email
    return(
        <div>

        </div>
    )
}