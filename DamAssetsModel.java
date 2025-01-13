package com.adobe.aem.guides.wknd.core.models;

import com.day.cq.dam.api.Asset;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class DamAssetsModel {

    private static final Logger log = LoggerFactory.getLogger(DamAssetsModel.class);

    @Self
    private Resource resource;

    @ValueMapValue
    @Default(values = {"/content/dam/wknd/en"}) // Default value for DAM paths
    private String[] damPaths; // Reading as String array

    private List<AssetData> assetList;

    @PostConstruct
    protected void init() {
        log.info("Initializing DamAssetsModel");

        assetList = new ArrayList<>();

        if (damPaths == null || damPaths.length == 0) {
            log.error("No DAM paths configured for this component.");
            return;
        }
        log.debug("dampaths  {} ", damPaths);
        ResourceResolver resourceResolver = resource.getResourceResolver();
        if (resourceResolver == null) {
            log.error("ResourceResolver is null, cannot resolve DAM paths.");
            return;
        }

        for (String damPath : damPaths) {
            if (damPath == null || damPath.trim().isEmpty()) {
                log.warn("Skipping invalid or empty DAM path.");
                continue;
            }

            Resource damResource = resourceResolver.getResource(damPath.trim());
            if (damResource == null) {
                log.warn("No resource found at path: {}", damPath);
                continue;
            }

            log.info("Processing DAM path: {}", damPath);

            for (Resource child : damResource.getChildren()) {
                Asset asset = child.adaptTo(Asset.class);
                if (asset != null) {
                    AssetData assetData = new AssetData();
                    assetData.setName(asset.getName());
                    assetData.setPath(asset.getPath());
                    populateAssetMetadata(resourceResolver, asset, assetData);
                    assetList.add(assetData);
                } else {
                    log.debug("Child at path {} is not an asset.", child.getPath());
                }
            }
        }

        log.info("Asset list generation completed. Total assets: {}", assetList.size());
    }

    private void populateAssetMetadata(ResourceResolver resourceResolver, Asset asset, AssetData assetData) {
        try {
            Session session = resourceResolver.adaptTo(Session.class);
            if (session == null) {
                log.warn("Session is null, skipping metadata retrieval.");
                return;
            }

            String metadataPath = asset.getPath() + "/jcr:content/metadata";
            String nodePath = asset.getPath() + "/jcr:content";
            Node metadataNode = session.nodeExists(metadataPath) ? session.getNode(metadataPath) : null;
            Node contentNode =  session.nodeExists(nodePath) ? session.getNode(nodePath) : null;

            if (metadataNode != null) {
                // Set the lastModified value, checking metadataNode first, then contentNode, and defaulting to "N/A"
                assetData.setLastModified(
                        metadataNode != null && metadataNode.hasProperty("jcr:lastModified")
                                ? metadataNode.getProperty("jcr:lastModified").getString()
                                : (contentNode != null && contentNode.hasProperty("jcr:lastModified")
                                ? contentNode.getProperty("jcr:lastModified").getString()
                                : "N/A")
                );
                assetData.setModifiedBy(
                        metadataNode != null && metadataNode.hasProperty("jcr:lastModifiedBy")
                                ? metadataNode.getProperty("jcr:lastModifiedBy").getString()
                                : (contentNode != null && contentNode.hasProperty("jcr:lastModifiedBy")
                                ? contentNode.getProperty("jcr:lastModifiedBy").getString()
                                : "N/A")
                );
                assetData.setLockedBy(
                        metadataNode != null && metadataNode.hasProperty("cq:lockOwner")
                                ? metadataNode.getProperty("cq:lockOwner").getString()
                                : (contentNode != null && contentNode.hasProperty("cq:lockOwner")
                                ? contentNode.getProperty("cq:lockOwner").getString()
                                : "N/A")
                );
            } else {
                log.debug("Metadata node not found for asset: {}", asset.getPath());
            }
        } catch (RepositoryException e) {
            log.error("Error retrieving metadata for asset at path: {}", asset.getPath(), e);
        }
    }

    public List<AssetData> getAssetList() {
        return Collections.unmodifiableList(assetList);
    }
}