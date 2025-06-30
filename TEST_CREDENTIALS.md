# Test Credentials

## Working Demo Credentials

**Source**: [https://admin-cms-self.vercel.app](https://admin-cms-self.vercel.app)

### Admin Login:
- **Username**: `admin1`
- **Password**: `D@ngthanhdung173`

### API Endpoint:
- **Backend URL**: `http://65.109.108.95:3001/api`
- **Login Endpoint**: `http://65.109.108.95:3001/api/admin/login`

### Successful Response Example:
```json
{
  "success": true,
  "result": {
    "user": {
      "_id": "685f7506a8a1f9dd95bc0d7f",
      "userName": "admin1",
      "__v": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Test Commands:
```bash
# Login Test
curl -X POST http://65.109.108.95:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"userName":"admin1","password":"D@ngthanhdung173"}'

# Authenticated API Test
curl -X POST http://65.109.108.95:3001/api/admin/user/list \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [ACCESS_TOKEN]" \
  -d '{"page":1,"limit":10,"filterBy":"","sortBy":{"amount":-1}}'
```

## ✅ Status: All API endpoints working correctly with these credentials! 