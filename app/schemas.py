from pydantic import BaseModel, HttpUrl

class URLBase(BaseModel):
    target_url: HttpUrl

class URLCreate(URLBase):
    pass

class URLResponse(URLBase):
    short_code: str
    clicks: int

    class Config:
        from_attributes = True
