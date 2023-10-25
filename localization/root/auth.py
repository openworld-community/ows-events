def is_authorized(token_from_request, token_to_validate):
    # two validations in case both tokens are None for some reason
    return token_from_request and token_from_request == token_to_validate
