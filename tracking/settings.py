try:
    # pylint: disable=unused-import
    from .secret import (
        MOVES_ACCESS_TOKEN,
        MOVES_CLIENT_ID,
        MOVES_CLIENT_SECRET,
        MOVES_REFRESH_TOKEN,
    )
except ImportError:
    MOVES_ACCESS_TOKEN = 'CouldNotLoadSecretFile'
    MOVES_CLIENT_ID = 'CouldNotLoadSecretFile'
    MOVES_CLIENT_SECRET = 'CouldNotLoadSecretFile'
    MOVES_REFRESH_TOKEN = 'CouldNotLoadSecretFile'
