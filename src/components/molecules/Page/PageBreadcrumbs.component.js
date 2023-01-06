import { Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

function BreadcrumbItem({ item = {}, current = false, onClick = () => {} }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(item.route, { replace: true });
  };

  if (current) {
    return (
      <Typography key="3" color="text.primary" sx={{ fontWeight: 'bold' }}>
        {item.label}
      </Typography>
    );
  }

  return (
    <Link
      underline="hover"
      key={item.id}
      color="inherit"
      href={item.route}
      onClick={handleClick}
      sx={{ color: '#137ea4', fontWeight: 'bold' }}>
      {item.label}
    </Link>
  );
}

export default function PageBreadcrumbs({ items = [] }) {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {items.map((item, i) => (
        <BreadcrumbItem key={item.id} item={item} current={items.length - 1 === i} />
      ))}
    </Breadcrumbs>
  );
}
