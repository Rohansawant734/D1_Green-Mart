package com.greenmart.service;

import java.util.List;
import java.util.Map;

public interface DashboardService {

	Long getUserCount();

	Long getSupplierCount();

	Map<String, Long> getProductCountByCategory();

	List<Map<String, Long>> getTopProducts();

	Long getProductCount();

}
