from django.urls import re_path as url
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from notify.consumers import NotificationsConsumer


application = ProtocolTypeRouter({
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter([
                url(r"^notify/$", NotificationsConsumer.as_asgi()),
            ])
        ),
    ),
})
