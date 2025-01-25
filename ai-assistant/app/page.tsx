import CalendarApp from "@/components/calendar-app";

const getBearerToken = async () => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "api_key": process.env.SX_PLATFORM_API_KEY,
      "group_id": 2,
      "id": "123"
    })
  }
  const response = await fetch('https://platform.schedule-x.com/user/login', requestOptions)
  const data = await response.json()
  return data.access_token
}

export default async function Home() {
  const bearerToken = await getBearerToken()
  if (!bearerToken) {
    return <div>Could not retrieve bearer token</div>
  }

  return (
    <div>
      <CalendarApp bearerToken={bearerToken} />
    </div>
  );
}
