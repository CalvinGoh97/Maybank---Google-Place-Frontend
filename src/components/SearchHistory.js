import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const SearchHistory = () => {
    const places = useSelector(state => state.places);
    const items = places?.items || [];  // Safely access items with fallback

    // Ensure items is an array before mapping
    const searchHistory = Array.isArray(items) ? items : [];

    if (searchHistory.length === 0) {
        return <div>No search history</div>;
    }

    return (
        <List>
            {searchHistory.map((place, index) => (
                <ListItem
                    key={place.placeId || index}
                    secondaryAction={
                        <IconButton edge="end" aria-label="favorite">
                            <FavoriteIcon />
                        </IconButton>
                    }
                >
                    <ListItemText
                        primary={place.name}
                        secondary={place.address}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default SearchHistory;