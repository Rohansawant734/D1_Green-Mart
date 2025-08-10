package com.greenmart.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenmart.dao.ProductDao;
import com.greenmart.dao.SupplierDao;
import com.greenmart.dao.UserDao;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class DashboardServiceImpl implements DashboardService{

	private final UserDao userDao;;
	private final SupplierDao supplierDao;
	private final ProductDao productDao;
	@Override
	public Long getUserCount() {
		return userDao.count();
	}
	@Override
	public Long getSupplierCount() {
		return supplierDao.count();
	}
	
	@Override
	public Long getProductCount() {
		return productDao.count();
	}
	@Override
	public Map<String, Long> getProductCountByCategory() {
		List<Object[]> result = productDao.countProductGroupByList();
		Map<String, Long> map = new LinkedHashMap<>();
		for(Object[] row : result) {
			map.put((String) row[0], (Long) row[1]);
		}
		return map;
	}
	@Override
	public List<Map<String, Long>> getTopProducts() {
	    List<Object[]> result = productDao.findTopProducts();
	    List<Map<String, Long>> topProducts = new ArrayList<>();
	    
	    for (Object[] row : result) {
	        String productName = (String) row[0];
	        Long totalSales = (row[1] instanceof Long)
	            ? (Long) row[1]
	            : ((Number) row[1]).longValue(); // to handle BigInteger, etc.

	        Map<String, Long> productData = new LinkedHashMap<>();
	        productData.put(productName, totalSales);
	        topProducts.add(productData);
	    }

	    return topProducts;
	}
}
