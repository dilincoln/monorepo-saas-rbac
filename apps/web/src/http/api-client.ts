import { env } from '@saas/env'
import { type CookiesFn, getCookie } from 'cookies-next'

import { I18N_COOKIE_NAME } from '@/constants/i18n-cookie-name'

class HTTPError {
  constructor(message: string, status: number = 400) {
    this.message = message
    this.status = status
  }

  public message: string
  public status: number
}

class ApiClient {
  private baseUrl = ''

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<R>(url: string, config?: RequestInit) {
    const headers: HeadersInit = {
      ...config?.headers,
      'Content-Type': 'application/json',
    }

    const isServerSide = typeof window === 'undefined'
    let cookieStore: CookiesFn | undefined

    if (isServerSide) {
      const { cookies: serverCookies } = await import('next/headers')

      cookieStore = serverCookies
    }

    const token = await getCookie('token', {
      cookies: cookieStore,
    })

    if (token) {
      Object.assign(headers, {
        Authorization: `Bearer ${token}`,
      })
    }

    const locale = await getCookie(I18N_COOKIE_NAME, {
      cookies: cookieStore,
    })

    if (locale) {
      Object.assign(headers, {
        'Accept-Language': locale,
      })
    }

    const request = await fetch(new URL(url, this.baseUrl).toString(), {
      ...config,
      headers,
    })

    const response = await request.json()

    if (!request.ok) {
      throw new HTTPError(response.message, request.status)
    }

    return response as Promise<R>
  }

  public get<ResponseType>(
    url: string,
    config?: Omit<RequestInit, 'method' | 'body'>,
  ) {
    return this.request<ResponseType>(url, {
      method: 'GET',
      ...config,
    })
  }

  public post<RequestType, ResponseType>(
    url: string,
    data: RequestType,
    config?: Omit<RequestInit, 'method' | 'body'>,
  ) {
    return this.request<ResponseType>(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    })
  }

  public put<RequestType, ResponseType>(
    url: string,
    data: RequestType,
    config?: Omit<RequestInit, 'method' | 'body'>,
  ) {
    return this.request<ResponseType>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    })
  }

  public delete<ResponseType>(
    url: string,
    config?: Omit<RequestInit, 'method' | 'body'>,
  ) {
    return this.request<ResponseType>(url, {
      method: 'DELETE',
      ...config,
    })
  }

  public patch<RequestType, ResponseType>(
    url: string,
    data: RequestType,
    config?: Omit<RequestInit, 'method' | 'body'>,
  ) {
    return this.request<ResponseType>(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...config,
    })
  }
}

const api = new ApiClient(env.NEXT_PUBLIC_API_URL)

export { api, HTTPError }
